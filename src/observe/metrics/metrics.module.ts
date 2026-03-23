import { Global, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { makeCounterProvider, makeGaugeProvider, makeHistogramProvider, PrometheusModule } from "@willsoto/nestjs-prometheus";
import { HttpMetricsInterceptor } from "./http-metrics.interceptor";

@Global()
@Module({
    imports: [
        PrometheusModule.register({
            path: '/metrics',
            defaultMetrics: {
                enabled: true,
            }
        })
    ],
    providers: [
        makeHistogramProvider({
            name: 'http_request_duration_seconds',
            help: 'HTTP request latency',
            labelNames: ['service', 'method', 'route', 'status'],
            buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5]
        }),
        makeCounterProvider({
            name: 'http_requests_total',
            help: 'HTTP requests count',
            labelNames: ['service', 'method', 'route', 'status'],
        }),
        makeGaugeProvider({
            name: 'http_requests_in_process',
            help: 'Current in process requests',
            labelNames: ['service'],
        }),
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpMetricsInterceptor
        }
    ],
})
export class MetricsModule {

}