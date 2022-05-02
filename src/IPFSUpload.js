import { NFTStorage, File } from 'nft.storage'

const NFT_STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJlQmRCMzRFMDY5YzA5MWFFNDU5YmVhMjdBMjEyMGYyRDZkMDAwNWQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTUxMzcwMDk5NywibmFtZSI6IkNyeXB0b2RlY2sifQ.eFa0QwzBb6rsGgLGTMlsmhD1mJ4bLpo5DIiibcTFAvU"
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })


// Pass in file from file upload element. 
// Here is an example from stackoverflow: https://stackoverflow.com/questions/51533584/converting-an-image-to-binary-in-javascript-using-base64
function uploadImageToIPFS(file, filename, mimetype, nftinfo, comp) {
    var reader = new FileReader()
    reader.onloadend = function() {
        var data = (reader.result).split(',')[1];
        var bin = Buffer.from(data, 'base64'); 

        const imageFile = new File([ bin ], filename, { type: 'image/'+mimetype })
        const metadata = await client.store({
          name: nftinfo.name,
          description: nftinfo.description,
          image: imageFile
        })

        comp(metadata)
    }
    reader.readAsDataURL(file)
}