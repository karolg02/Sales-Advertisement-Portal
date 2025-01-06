import {BlobServiceClient} from '@azure/storage-blob';

const AZURE_STORAGE_ACCOUNT_NAME = "shoppingkarol";
const AZURE_STORAGE_SAS_TOKEN = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-04-05T06:47:49Z&st=2024-10-29T23:47:49Z&spr=https&sig=tdne4zN9Ie%2FHMjxTWkGq32UB36RobbwdZpGLrZXORWc%3D";
const AZURE_CONTAINER_NAME = "shoppingapp";

export const uploadToAzure = async (file: File): Promise<string | null> => {
    try {
        const blobServiceClient = new BlobServiceClient(`https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${AZURE_STORAGE_SAS_TOKEN}`);
        const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);

        // Generate a unique blob name
        const blobName = `${Date.now()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload file
        await blockBlobClient.uploadBrowserData(file);

        // Return the URL of the uploaded file
        return blockBlobClient.url;
    } catch (error) {
        console.error("Error uploading file to Azure:", error);
        return null;
    }
};
