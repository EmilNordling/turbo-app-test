import { injectable } from "dependency_injection";
import { Logger } from "./logger.service";

@injectable()
export class Startup {
  // public readonly events = new EventEmitter<{
  // 	bootStateChange: BootState;
  // }>();
  public get bootState(): BootState {
    return this.internalBootState;
  }
  public set bootState(state: BootState) {
    this.internalBootState = state;
    // this.events.emit('bootStateChange', state);
    this.logger.log(`🚩 Boot state changed to ${BootState[state]}`);
  }
  private internalBootState: BootState = BootState.Pristine;

  constructor(private readonly logger: Logger) {
    // Empty
  }

  public async boot(): Promise<void> {
    if (this.bootState !== BootState.Pristine) {
      throw new Error("application may only be booted once");
    }

    try {
      this.logger.log("🔃 Starting booting process ...");

      this.bootState = BootState.NonFunctional;

      this.logger.log("✅ Successfully booted the application!");
    } catch (error: unknown) {
      this.logger.log(`❌ Failed to boot the application!`);

      throw error;
    }
  }
}

export enum BootState {
  Pristine = 0,
  NonFunctional = 1,
  Completed = 999,
}
