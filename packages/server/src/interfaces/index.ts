import { UpdateResult } from 'typeorm';

export default interface CustomUpdateResult extends UpdateResult {
  raw: {
    changedRows: number;
  };
}
