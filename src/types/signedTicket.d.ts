import Signature from './signature'
import Ticket from './ticket'

declare namespace SignedTicket {
  const SIZE: number

  function create(
    arr?: {
      bytes: Uint8Array
      offset: number
    },
    struct?: {
      ticket?: Ticket
      signature?: Signature
    }
  ): Promise<SignedTicket>
}
declare interface SignedTicket extends Uint8Array {
  ticket: Ticket
  signature: Signature
  signer: Promise<Uint8Array>

  verify(pubKey: Uint8Array): Promise<boolean>
}

export default SignedTicket
