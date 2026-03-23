import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter, Gauge, Histogram } from "prom-client";
import { finalize, Observable } from "rxjs";

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
    private readonly serviceName = 'gateway'

    constructor(
        @InjectMetric('http_requests_total')
        private readonly counter: Counter<string>,

        @InjectMetric('http_requests_in_process')
        private readonly inProcess: Gauge<string>,

        @InjectMetric('http_request_duration_seconds')
        private readonly histogram: Histogram<string>,
    ) { }

    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const req = context.switchToHttp().getRequest()
        const res = context.switchToHttp().getResponse()

        const method = req.method
        const route = req.route.path

        this.inProcess.inc({ service: this.serviceName })

        const endTimer = this.histogram.startTimer()

        return next.handle().pipe(
            finalize(() => {
                const status = res.statusCode.toString()

                this.counter.inc({
                    service: this.serviceName,
                    method,
                    route,
                    status
                })

                endTimer({
                    service: this.serviceName,
                    method,
                    route,
                    status
                })

                this.inProcess.dec({ service: this.serviceName })
            })
        )
    }
}