import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { SendOtpRequest } from "src/modules/auth/dto/requests/send-otp.request";

@ValidatorConstraint({ name: "IdentifierValidator" })
export class IdentifierValidator implements ValidatorConstraintInterface {
    public validate(value: string, args: ValidationArguments): boolean {
        const object = args.object as SendOtpRequest

        if (object.type === 'email') {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        } else if (object.type === 'phone') {
            return /^\+?\d{10,15}$/.test(value);
        }

        return false;
    }

    public defaultMessage(args: ValidationArguments): string {
        const object = args.object as SendOtpRequest

        if (object.type === 'email') return 'identifier invalid email'
        else if (object.type === 'phone') return 'identifier invalid phone'

        return 'identifier invalid'
    }
}