import BN from 'bn.js'
import Ticket from './channel/ticket'

export interface toU8a {
  toU8a: (...props: any[]) => Uint8Array
}

export declare namespace TypeClasses {
  interface AccountId extends Uint8Array {}

  interface Channel extends toU8a {}

  interface Balance extends BN {}

  interface Hash extends Uint8Array {}

  interface Moment extends BN {}

  interface State extends toU8a {}

  interface SignedTicket extends toU8a {
    ticket: Ticket
    signature: Uint8Array
  }

  interface TicketEpoch extends BN, toU8a {}
}

export default interface Types {
  AccountId: new (...props: any[]) => TypeClasses.AccountId
  Balance: new (...props: any[]) => TypeClasses.Balance
  Channel: new (...props: any[]) => TypeClasses.Channel
  Hash: new (...props: any[]) => TypeClasses.Hash
  Moment: new (...props: any[]) => TypeClasses.Moment
  State: new (...props: any[]) => TypeClasses.State
  SignedTicket: new (...props: any[]) => TypeClasses.SignedTicket
  Ticket: new (...props: any[]) => Ticket
  TicketEpoch: new (...props: any[]) => TypeClasses.TicketEpoch
}
