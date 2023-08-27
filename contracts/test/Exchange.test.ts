import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MockERC721, NFTExchange } from "../typechain-types";
import { ContractTransaction } from "ethers";

describe("Exchange.test", function () {
  const INITIAL_NFTs = 10;
  let exchange: NFTExchange;
  let nftOne: MockERC721;
  let nftTwo: MockERC721;

  let collectionOneHolder: SignerWithAddress;
  let collectionTwoHolder: SignerWithAddress;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    collectionOneHolder = accounts[0];
    collectionTwoHolder = accounts[1];
    const MockERC721 = await ethers.getContractFactory("MockERC721");
    // deploy to account 0
    nftOne = await MockERC721.deploy("One", "NFT One", INITIAL_NFTs);

    // deploy to account 1
    nftTwo = await MockERC721.connect(collectionTwoHolder).deploy(
      "Two",
      "NFT Two",
      INITIAL_NFTs
    );

    const NFTExchange = await ethers.getContractFactory("NFTExchange");
    exchange = await NFTExchange.deploy();

    await nftOne.setApprovalForAll(exchange.address, true);
    await nftTwo.setApprovalForAll(exchange.address, true);
  });

  describe("Deployment Test", () => {
    it("should deploy Collection One and mint to correct owner", async () => {
      expect(await nftOne.balanceOf(collectionOneHolder.address)).to.eq(
        INITIAL_NFTs
      );
    });

    it("should deploy Collection two and mint to correct owner", async () => {
      expect(await nftTwo.balanceOf(collectionTwoHolder.address)).to.eq(
        INITIAL_NFTs
      );
    });
  });

  describe("Offer tests", () => {
    let recipet: ContractTransaction;
    const fromId = 1; // token id for which offer has been created
    const toId = 0;

    beforeEach(async () => {
      recipet = await exchange.createOffer(
        nftOne.address,
        nftTwo.address,
        fromId,
        toId
      );
    });

    describe("Create Offer", () => {
      it("should create offer", async () => {
        expect(recipet).emit(exchange, "SubmitOffer");
      });

      it("should create correct offer mapping", async () => {
        const currentOffer = await exchange.offers(1);

        expect(currentOffer.fromCollection).to.eq(nftOne.address);
        expect(currentOffer.toCollection).to.eq(nftTwo.address);
        expect(currentOffer.toId).to.eq(toId);
        expect(currentOffer.fromId).to.eq(fromId);
        expect(currentOffer.value).to.eq(0);
      });
    });

    describe("Accept Offer", () => {
      beforeEach(async () => {
        recipet = await exchange.connect(collectionTwoHolder).accpetOffer(1);
      });

      it("should emit OfferAccept event after successful call", async () => {
        expect(recipet).emit(exchange, "OfferAccept");
      });

      it("should update the ownership for offered token Id", async () => {
        expect(await nftOne.ownerOf(fromId)).to.eq(collectionTwoHolder.address);
      });
      it("should update the ownership for receving token Id", async () => {
        expect(await nftTwo.ownerOf(toId)).to.eq(collectionOneHolder.address);
      });
    });
  });
});
