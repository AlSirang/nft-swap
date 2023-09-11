import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { OfferRemoved } from "../generated/schema"
import { OfferRemoved as OfferRemovedEvent } from "../generated/NFTExchange/NFTExchange"
import { handleOfferRemoved } from "../src/nft-exchange"
import { createOfferRemovedEvent } from "./nft-exchange-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let offerId = BigInt.fromI32(234)
    let fromId = BigInt.fromI32(234)
    let toId = BigInt.fromI32(234)
    let toCollection = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newOfferRemovedEvent = createOfferRemovedEvent(
      offerId,
      fromId,
      toId,
      toCollection
    )
    handleOfferRemoved(newOfferRemovedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OfferRemoved created and stored", () => {
    assert.entityCount("OfferRemoved", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OfferRemoved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "offerId",
      "234"
    )
    assert.fieldEquals(
      "OfferRemoved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fromId",
      "234"
    )
    assert.fieldEquals(
      "OfferRemoved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "toId",
      "234"
    )
    assert.fieldEquals(
      "OfferRemoved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "toCollection",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
