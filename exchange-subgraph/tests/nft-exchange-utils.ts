import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { OfferRemoved, SubmitOffer } from "../generated/NFTExchange/NFTExchange"

export function createOfferRemovedEvent(
  offerId: BigInt,
  fromId: BigInt,
  toId: BigInt,
  toCollection: Address
): OfferRemoved {
  let offerRemovedEvent = changetype<OfferRemoved>(newMockEvent())

  offerRemovedEvent.parameters = new Array()

  offerRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  offerRemovedEvent.parameters.push(
    new ethereum.EventParam("fromId", ethereum.Value.fromUnsignedBigInt(fromId))
  )
  offerRemovedEvent.parameters.push(
    new ethereum.EventParam("toId", ethereum.Value.fromUnsignedBigInt(toId))
  )
  offerRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "toCollection",
      ethereum.Value.fromAddress(toCollection)
    )
  )

  return offerRemovedEvent
}

export function createSubmitOfferEvent(
  toId: BigInt,
  fromId: BigInt,
  offerIndex: BigInt,
  msgValue: BigInt,
  toCollection: Address,
  fromCollection: Address,
  from: Address
): SubmitOffer {
  let submitOfferEvent = changetype<SubmitOffer>(newMockEvent())

  submitOfferEvent.parameters = new Array()

  submitOfferEvent.parameters.push(
    new ethereum.EventParam("toId", ethereum.Value.fromUnsignedBigInt(toId))
  )
  submitOfferEvent.parameters.push(
    new ethereum.EventParam("fromId", ethereum.Value.fromUnsignedBigInt(fromId))
  )
  submitOfferEvent.parameters.push(
    new ethereum.EventParam(
      "offerIndex",
      ethereum.Value.fromUnsignedBigInt(offerIndex)
    )
  )
  submitOfferEvent.parameters.push(
    new ethereum.EventParam(
      "msgValue",
      ethereum.Value.fromUnsignedBigInt(msgValue)
    )
  )
  submitOfferEvent.parameters.push(
    new ethereum.EventParam(
      "toCollection",
      ethereum.Value.fromAddress(toCollection)
    )
  )
  submitOfferEvent.parameters.push(
    new ethereum.EventParam(
      "fromCollection",
      ethereum.Value.fromAddress(fromCollection)
    )
  )
  submitOfferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )

  return submitOfferEvent
}
