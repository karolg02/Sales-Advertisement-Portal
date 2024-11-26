import { BlobServiceClient } from '@azure/storage-blob';
import {AZURE_CN, AZURE_SAN, AZURE_SST} from "../../config.ts";

const AZURE_STORAGE_ACCOUNT_NAME = AZURE_SAN;
const AZURE_STORAGE_SAS_TOKEN = AZURE_SST;
const AZURE_CONTAINER_NAME = AZURE_CN;

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
