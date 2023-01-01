// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Beau {

  uint256 private pictureCount;

  struct Picture {
    address ownerAddress;
    string name;
    string desc;
    string UD;
    string URL;
    uint256 likes;
    uint256 downloads;
  }

  Picture[] pictures;

  function createPicture(
    string memory _name,
    string memory _desc,
    string memory _UD,
    string memory _URL
  ) public {


    uint256 _likes;
    uint256 _downloads;

    pictures.push(Picture(msg.sender, _name, _desc, _UD, _URL, _likes, _downloads));

    pictureCount ++;
  }

  function getPictures(uint256 _index) public view returns (
    address ownerAddress,
    string memory name,
    string memory desc,
    string memory UD,
    string memory URL,
    uint256 likes,
    uint256 downloads
  ) {

    Picture storage pix = pictures[_index];

    return (
    pix.ownerAddress,
    pix.name,
    pix.desc,
    pix.UD,
    pix.URL,
    pix.likes,
    pix.downloads
    );
  }

  function setDownload(uint256 _index) public {
    Picture storage pix = pictures[_index];
    pix.downloads++;
  }

    function setLike(uint256 _index) public {
      Picture storage pix = pictures[_index];
      require(msg.sender != pix.ownerAddress, "Owner can't like the picture");
      pix.likes++;
    }

  function getPictureCount() public view returns (uint256) {
    return pictureCount;
  }
}