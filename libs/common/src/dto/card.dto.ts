import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  @Min(1)
  @Max(12)
  exp_month: number;

  @IsNumber()
  @Min(new Date().getFullYear())
  exp_year: number;

  // @IsOptional()
  // networks?: Stripe.PaymentMethodCreateParams.Card.Networks;

  @IsCreditCard()
  number: string;

  // @IsString()
  // token?: string;
}
