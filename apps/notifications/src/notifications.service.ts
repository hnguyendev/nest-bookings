import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly transporter = nodemailer.createTransport({
    service: this.configService.get('SMTP_SERVICE'),
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('OAUTH_REFRESH_TOKEN'),
    },
  });

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Nest Bookings Notification',
      text,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
