import { define } from 'typeorm-seeding';

import Program from '../entity/Program.entity';

define(Program, () => {
  /* 
    boolean에 왜 줄이 쳐지는 지 알 수 없다. faker 공식 문서를 보면 분명 datatype만 살아있는 것 같은데...
  */
  const program = new Program();

  return program;
});
