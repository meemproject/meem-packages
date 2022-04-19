// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

/**
 * @title Interface for Auction Houses
 */
interface IAuctionHouse {
	struct Auction {
		bool isActive;
		// ID for the ERC721 token
		uint256 tokenId;
		// Address for the ERC721 contract
		address tokenContract;
		// Whether or not the auction curator has approved the auction to start
		bool approved;
		// The current highest bid amount
		uint256 amount;
		// The length of time to run the auction for, after the first bid was made
		uint256 duration;
		// The time of the first bid
		uint256 firstBidTime;
		// The minimum price of the first bid
		uint256 reservePrice;
		// The sale percentage to send to the curator
		uint8 curatorFeePercentage;
		// The address that should receive the funds once the NFT is sold.
		address tokenOwner;
		// The address of the current highest bid
		address payable bidder;
		// The address of the auction's curator.
		// The curator can reject or approve an auction
		address payable curator;
		// The address of the ERC-20 currency to run the auction with.
		// If set to 0x0, the auction will be run in ETH
		address auctionCurrency;
		uint256 timeBuffer;
		uint8 minBidIncrementPercentage;
	}

	event AuctionCreated(
		address indexed tokenContract,
		uint256 indexed tokenId,
		uint256 duration,
		uint256 reservePrice,
		address tokenOwner,
		address curator,
		uint8 curatorFeePercentage,
		address auctionCurrency
	);

	event AuctionApprovalUpdated(
		address indexed tokenContract,
		uint256 indexed tokenId,
		bool approved
	);

	event AuctionReservePriceUpdated(
		address indexed tokenContract,
		uint256 indexed tokenId,
		uint256 reservePrice
	);

	event AuctionBid(
		address indexed tokenContract,
		uint256 indexed tokenId,
		address sender,
		uint256 value,
		bool firstBid,
		bool extended
	);

	event AuctionDurationExtended(
		address indexed tokenContract,
		uint256 indexed tokenId,
		uint256 duration
	);

	event AuctionEnded(
		address indexed tokenContract,
		uint256 indexed tokenId,
		address tokenOwner,
		address winner,
		uint256 amount,
		address auctionCurrency
	);

	event AuctionCanceled(
		address indexed tokenContract,
		uint256 indexed tokenId,
		address tokenOwner
	);

	function createAuction(
		address tokenContract,
		uint256 tokenId,
		uint256 duration,
		uint256 reservePrice,
		address payable curator,
		uint8 curatorFeePercentages,
		address auctionCurrency,
		uint256 timeBuffer
	) external;

	function setAuctionApproval(
		address tokenContract,
		uint256 tokenId,
		bool approved
	) external;

	function setAuctionReservePrice(
		address tokenContract,
		uint256 tokenId,
		uint256 reservePrice
	) external;

	function createBid(
		address tokenContract,
		uint256 tokenId,
		uint256 amount
	) external payable;

	function endAuction(address tokenContract, uint256 tokenId) external;

	function cancelAuction(address tokenContract, uint256 tokenId) external;
}
