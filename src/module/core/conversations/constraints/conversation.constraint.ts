import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class DriverExistConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    // const check = await new BuilderRepository(DriverSchema).findOneByQuery({
    //   [args.property]: value,
    // });
    // if (check) return false;
    return true;
  }
}
