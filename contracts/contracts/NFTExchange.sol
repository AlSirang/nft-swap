// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTExchange {
    using Counters for Counters.Counter; // counters for marketplace offers and orders
    Counters.Counter private _offerCount; // offers counter

    struct Offer {
        address fromCollection; // receiving collection
        address forCollection; // offered collection
        address from;
        uint256 value; // if any ETH value send with it
        uint256 offeredTokenId; // offered token
        uint256 forTokenId; // offered token
    }

    mapping(uint256 => Offer) public offers;

    mapping(uint256 => uint256[]) public tokenIdToOffers;

    //**************************************//
    //*************** EVENTS ***************//
    //**************************************//

    event SubmitOffer(
        uint256 offeredTokenId, // is the token for which user has made offer
        uint256 indexed forTokenId,
        uint256 offerIndex,
        uint256 msgValue,
        address forCollection,
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

    function createOffer(
        address _fromCollection,
        address _forCollection,
        uint _offeredTokenId,
        uint _forTokenId
    ) external payable {
        _offerCount.increment();

        address msgSender = msg.sender;
        uint256 msgValue = msg.value;

        Offer memory _offer = Offer(
            _fromCollection,
            _forCollection,
            msgSender,
            msgValue,
            _offeredTokenId,
            _forTokenId
        );

        offers[_offerCount.current()] = _offer;

        // transfer token offered by user to this contract

        IERC721(_fromCollection).transferFrom(
            msgSender,
            address(this),
            _forTokenId
        );

        emit SubmitOffer(
            _offeredTokenId,
            _forTokenId,
            _offerCount.current(),
            msgValue,
            _forCollection,
            _fromCollection,
            msgSender
        );
    }

    function accpetOffer(uint256 _offerIndex) external {
        Offer memory _offer = offers[_offerIndex];

        require(_offer.forCollection == address(0x0), "Offer does not exist");

        // remove offer from mapping to mark the offer as completed
        delete offers[_offerIndex];

        address ownerOf = IERC721(_offer.forCollection).ownerOf(
            _offer.forTokenId
        );

        require(msg.sender == ownerOf, "only owner");

        // transfer offer from this owner to the offer creator
        IERC721(_offer.forCollection).transferFrom(
            msg.sender,
            _offer.from,
            _offer.forTokenId
        );

        // transfer offer creator's NFT to this owner
        IERC721(_offer.fromCollection).transferFrom(
            address(this),
            msg.sender,
            _offer.offeredTokenId
        );

        // if offer creator has sent some ETH with offer send them to this owner
        if (_offer.value > 0) {
            (bool success, ) = payable(msg.sender).call{value: _offer.value}(
                ""
            );

            require(success, "ETH transfer failed");
        }

        emit OfferAccept(_offerIndex, _offer.offeredTokenId, _offer.forTokenId);
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
            _offer.offeredTokenId
        );

        // if offer owner has sent some eth return them back
        if (_offer.value > 0) {
            (bool success, ) = payable(msg.sender).call{value: _offer.value}(
                ""
            );

            require(success, "ETH transfer failed");
        }
    }

    function getOffers(
        uint256 _tokenId
    ) external view returns (uint256[] memory) {
        return tokenIdToOffers[_tokenId];
    }
}
