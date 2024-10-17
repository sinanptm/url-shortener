import { Global, Module } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

const NanoIdProvider = {
    provide: "NANOID",
    useFactory: () => customAlphabet("1231231mjndbfasdf", 7)
};

@Global()
@Module({
    providers: [NanoIdProvider],
    exports: ["NANOID"]
})
export class NanoidModule { };
