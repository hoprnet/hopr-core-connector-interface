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
  readonly types = MockTypes

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

export class MockUtils {

  isPartyA(self: MockAccountId, counterparty: MockAccountId): boolean { return true }

  getId(self: MockAccountId, counterparty: MockAccountId, ...props: any[]): Promise<MockHash> {
    return Promise.resolve(new MockHash())
  }

  pubKeyToAccountId(pubkey: Uint8Array, ...args: any[]): Promise<MockAccountId> {
    return Promise.resolve(new MockAccountId())
  }

  hash(msg: Uint8Array): Promise<MockHash> {
    return Promise.resolve(new MockHash())
  }

  sign(msg: Uint8Array, privKey: Uint8Array, pubKey: Uint8Array): Promise<MockSignature> {
    return Promise.resolve(new MockSignature)
  }

  verify(msg: Uint8Array, signature: MockSignature, pubkey: Uint8Array): Promise<boolean>{
    return Promise.resolve(true)
  }

  convertUnit(amount: MockBalance, sourceUnit: string, targetUnit: string): MockBalance {
    return new MockBalance(amount)
  }
}


class MockBalance extends BN implements Types.Balance {
  static SIZE = 100
  static SYMBOL = "MOCK"
  static DECIMALS = 18
}

class MockHash extends Uint8Array implements Types.Hash {
  static SIZE=10
}

class MockSignature extends Uint8Array implements Types.Signature{
  static SIZE=10
  onChainSignature = new Uint8Array()
  signature = new Uint8Array()
  recovery = 0
  msgPrefix = new Uint8Array()
  static create(){
    return new MockSignature(0)
  }
}

class MockAccountId extends Uint8Array {
  static SIZE = 10
}

class MockChannel {
  static createFunded(channelBalance: MockChannelBalance): MockChannel {
    return new MockChannel()
  }
  static createActive(channelBalance: MockChannelBalance): MockChannel {
    return new MockChannel()
  }
  static createPending(pending: MockMoment, balance: MockChannelBalance): MockChannel {
    return new MockChannel()
  }

  toU8a() {
    return new Uint8Array()
  }
}
class MockMoment extends BN {
  static SIZE=10
}


class MockChannelBalance {
  balance_a = new MockBalance(0)
  balance = new MockBalance(0)

  static SIZE = 10
  static create(){
    return new MockChannelBalance()
  }
  toU8a() {
    return new Uint8Array()
  }
}

class MockSignedChannel {
  static SIZE=10
  static create(){
    return Promise.resolve(new MockSignedChannel())
  }
}


const MockTypes = {
  AccountId: MockAccountId,
  Balance: MockBalance,
  NativeBalance: MockBalance,
  Signature: MockSignature,
  Hash: MockHash,
  Channel: MockChannel,
  ChannelBalance: MockChannelBalance,
  Moment: MockMoment,
  State: {SIZE: 10},
  SignedChannel: MockSignedChannel,
  Ticket: {},
  SignedTicket: {},
  TicketEpoch: {}
}
