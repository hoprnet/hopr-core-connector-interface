import type HoprCoreConnector from '.'
import type * as Utils from './utils'
import type * as Types from './types'
import BN from 'bn.js'
import type { LevelUp } from 'levelup'

/**
 * This class implements the interface with no-op's and can be
 * used for unit testing.
 */
export default class MockConnector implements HoprCoreConnector {
  readonly started = true
  readonly self = {
    privateKey: new Uint8Array(),
    publicKey: new Uint8Array(),
    onChainKeyPair: {}
  }
  readonly nonce: Promise<number>
  readonly utils = new MockUtils()

  constructor(
    public db: LevelUp,
  ) {
  }

  start(): Promise<void>{
    return Promise.resolve()
  }

  stop(): Promise<void>{
    return Promise.resolve()
  }

  initOnchainValues(): Promise<void>{
    return Promise.resolve()
  }

  static async create(
    db: LevelUp,
    seed: Uint8Array,
    options?: { id?: number; provider?: string; debug?: boolean }
  ): Promise<MockConnector> {
    return Promise.resolve(new MockConnector(db));
  }

}

export class MockUtils implements (typeof Utils) {

  isPartyA(self: AccountId, counterparty: AccountId): boolean { return true }

  getId(self: AccountId, counterparty: AccountId, ...props: any[]): Promise<Hash> {
    return Promise.resolve(self + "-" +counterparty)
  }

  pubKeyToAccountId(pubkey: Uint8Array, ...args: any[]): Promise<AccountId> {}

  hash(msg: Uint8Array): Promise<Hash> {}

  sign(msg: Uint8Array, privKey: Uint8Array, pubKey: Uint8Array): Promise<Signature> {}

  verify(msg: Uint8Array, signature: Signature, pubkey: Uint8Array): Promise<boolean>{
    return Promise.resolve(true)
  }

  convertUnit(amount: MockBalance, sourceUnit: string, targetUnit: string): MockBalance {
    return new MockBalance(amount)
  }
}

class MockBalance extends BN implements Types.Balance {
  SIZE = 100
  SYMBOL = "MOCK"
  DECIMALS = 18
}

