import {
  OfferRemoved as OfferRemovedEvent,
  SubmitOffer as SubmitOfferEvent,
} from "../generated/NFTExchange/NFTExchange";
import { OfferRemoved, SubmitOffer } from "../generated/schema";

export function handleOfferRemoved(event: OfferRemovedEvent): void {
  let entity = new OfferRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.offerId = event.params.offerId;
  entity.fromId = event.params.fromId;
  entity.toId = event.params.toId;
  entity.toCollection = event.params.toCollection;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSubmitOffer(event: SubmitOfferEvent): void {
  let entity = new SubmitOffer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.toId = event.params.toId;
  entity.fromId = event.params.fromId;
  entity.offerIndex = event.params.offerIndex;
  entity.msgValue = event.params.msgValue;
  entity.toCollection = event.params.toCollection;
  entity.fromCollection = event.params.fromCollection;
  entity.from = event.params.from;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
