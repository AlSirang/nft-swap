// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NFTExchange {
    using Counters for Counters.Counter; // counters for marketplace offers and orders
    Counters.Counter private _offerCount; // offers counter

    struct Offer {
        address from;
        address fromCollection; // receiving collection
        address toCollection; // offered collection
        uint256 fromId; // offered token
        uint256 toId; // offered token
        uint256 value; // if any ETH value send with it
    }

    mapping(uint256 => Offer) public offers;

    //**************************************//
    //*************** EVENTS ***************//
    //**************************************//

    event SubmitOffer(
        uint256 indexed forTokenId,
        uint256 offeredTokenId, // is the token for which user has made offer
        uint256 offerIndex,
        uint256 msgValue,
        address toCollection,
        address fromCollection,
        address from
    );

    event OfferAccept(
        uint256 offerId,
        uint256 offeredTokenId,
        uint256 forTokenId
    );

    //*************************************//
    //************* Functions *************//
    //*************************************//

    /**
     * @dev it will create new offer for given tokens and collections.
     * @param _fromCollection is offered collection
     * @param _toCollection is collection for which offer is being made
     * @param _fromId is token id which has been offered
     * @param _toId is token id which user wants to get in exchange for his token id
     */
    function createOffer(
        address _fromCollection,
        address _toCollection,
        uint256 _fromId,
        uint256 _toId
    ) external payable {
        address msgSender = msg.sender;
        uint256 msgValue = msg.value;

        // transfer token offered by user to this contract
        IERC721(_fromCollection).transferFrom(
            msgSender,
            address(this),
            _fromId
        );

        Offer memory _offer = Offer(
            msgSender,
            _fromCollection,
            _toCollection,
            _fromId,
            _toId,
            msgValue
        );

        _offerCount.increment();

        offers[_offerCount.current()] = _offer;

        emit SubmitOffer(
            _toId,
            _fromId,
            _offerCount.current(),
            msgValue,
            _toCollection,
            _fromCollection,
            msgSender
        );
    }

    function accpetOffer(uint256 _offerIndex) external {
        Offer memory _offer = offers[_offerIndex];
        require(_offer.toCollection != address(0x0), "Offer does not exist");

        // remove offer from mapping to mark the offer as completed
        delete offers[_offerIndex];

        address ownerOf = IERC721(_offer.toCollection).ownerOf(_offer.toId);
        address msgSender = msg.sender;

        require(msgSender == ownerOf, "only owner");

        // transfer offer from this owner to the offer creator
        IERC721(_offer.toCollection).transferFrom(
            msgSender,
            _offer.from,
            _offer.toId
        );

        // transfer offer creator's NFT to this owner
        IERC721(_offer.fromCollection).transferFrom(
            address(this),
            msgSender,
            _offer.fromId
        );

        // if offer creator has sent some ETH with offer send them to this owner
        if (_offer.value > 0) {
            (bool success, ) = payable(msgSender).call{value: _offer.value}("");
            require(success, "ETH transfer failed");
        }

        emit OfferAccept(_offerIndex, _offer.fromId, _offer.toId);
    }

    function removeOffer(uint256 _offerIndex) external {
        Offer memory _offer = offers[_offerIndex];
        require(_offer.from == msg.sender, "Only offer creator");

        // remove offer from mapping to mark the offer as completed
        delete offers[_offerIndex];

        // transfer tokenId back to creator
        IERC721(_offer.fromCollection).transferFrom(
            address(this),
            msg.sender,
            _offer.fromId
        );

        // if offer owner has sent some eth return them back
        if (_offer.value > 0) {
            (bool success, ) = payable(msg.sender).call{value: _offer.value}(
                ""
            );

            require(success, "ETH transfer failed");
        }
    }
}
