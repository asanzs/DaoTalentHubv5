// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title DAO Talent Passport
 * @dev Soulbound Token (SBT) implementation using ERC-1155 for early adopters and credentials.
 * Tokens are non-transferable (Soulbound) to ensure credentials remain with the original earner.
 */
contract TalentPassport is ERC1155, Ownable {
    using Strings for uint256;

    // Token IDs
    uint256 public constant EARLY_ADOPTER_PASS = 1;
    uint256 public constant LEVEL_1_CREDENTIAL = 2;
    // ... future modules and credentials can map to other IDs

    string public name = "DAO Talent Passport";
    string public symbol = "TALPASS";

    // Mapping to track if an address has a specific token (since they are unique credentials)
    mapping(uint256 => mapping(address => bool)) public hasToken;

    constructor() ERC1155("https://daotalenthub.vercel.app/api/metadata/{id}.json") Ownable(msg.sender) {}

    /**
     * @dev Mints an Early Adopter Pass SBT to the user.
     * Can only be called by the DAO owner/admin (our backend webhook).
     */
    function mintEarlyPass(address account) external onlyOwner {
        require(!hasToken[EARLY_ADOPTER_PASS][account], "Account already holds an Early Pass");
        _mint(account, EARLY_ADOPTER_PASS, 1, "");
        hasToken[EARLY_ADOPTER_PASS][account] = true;
    }

    /**
     * @dev Mints a specific credential SBT to the user.
     * Can be hooked to our backend when a user passes a University module.
     */
    function mintCredential(address account, uint256 credentialId) external onlyOwner {
        require(!hasToken[credentialId][account], "Account already holds this credential");
        _mint(account, credentialId, 1, "");
        hasToken[credentialId][account] = true;
    }

    /**
     * @dev Prevents transfer of tokens to make them Soulbound.
     * Only allows minting (from zero address) or burning (to zero address).
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(from == address(0) || to == address(0), "TalentPassport: Tokens are Soulbound and non-transferable");
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require(from == address(0) || to == address(0), "TalentPassport: Tokens are Soulbound and non-transferable");
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}
