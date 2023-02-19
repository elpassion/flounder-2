import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueNamesEnum } from '../../queue/enums/queue-names.enum';
import { assertIsDTO } from '../../../shared/common/assert-is-dto';
import { NotificationDTO } from '@flounder/contracts';
import { WSGateway } from '@flounder/websocket';

@Processor(QueueNamesEnum.NOTIFICATIONS)
export class NotificationsConsumer {
  constructor(private readonly webSocketGateway: WSGateway) {}

  @OnQueueError()
  async onError(err: Error) {
    console.error('Redis error occurred: ', err);
  }

  @Process()
  async sendNotification(job: Job<unknown>) {
    const data = await this.assertIsNotification(job.data);
    this.webSocketGateway.sendNotification(data);
  }

  private async assertIsNotification(payload: unknown): Promise<NotificationDTO> {
    return assertIsDTO(NotificationDTO, payload);
  }
}
