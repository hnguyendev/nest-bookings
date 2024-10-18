import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET'),
    {
      apiVersion: '2024-09-30.acacia',
    },
  );

  async createCharge({ amount }: CreateChargeDto) {
    // for development only
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   amount: amount * 100,
    //   confirm: true,
    //   currency: 'usd',
    //   payment_method: paymentMethod.id,
    //   payment_method_types: ['card'],
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    return paymentIntent;
  }
}
