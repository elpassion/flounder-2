import { BootstrapConsole } from 'nestjs-console';
import { CommandsModule } from './modules/commands';

const bootstrap = new BootstrapConsole({
  module: CommandsModule,
  useDecorators: true,
});

bootstrap.init().then(async app => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
