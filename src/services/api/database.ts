import axios from "axios";
import useAuthStore from "../../app/store/authStore";


export interface ConnectionPayload {
  host: string;
  user: string;
  password: string;
  database?: string;
  port: string;
}

export const connectToDatabase = async (payload: ConnectionPayload) => {
  try {

    // const {  tenantId } = useAuthStore.getState();
const tenantId = 3648179915
const accessToken = "eyJraWQiOiJuT1FOS01QYlBRSE9FSkZuUlptT2VZeDFVUG1LNEdNOE1RS2FhQk80Q3EwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5MzIzYzBmZS04ZWE3LTRhZTAtYjRjZS1hZTllNmUyNDJmNjEiLCJldmVudF9pZCI6IjhmMTRhMDZmLTQzYjQtNDFhMi1iOTFjLTdjZGRiN2MwZDE3NiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NDM2NzA5MDEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfZXM0eVdZMU85IiwiZXhwIjoxNzQzNzU3MzAxLCJpYXQiOjE3NDM2NzA5MDEsImp0aSI6IjA2YzMxZGEyLTNiNjQtNDRmOC1iMzRkLTJmZjI4OTdiYTlkNCIsImNsaWVudF9pZCI6IjdodGUxbmtqdWc2cnFzZjlhaXI2MDIxYXFyIiwidXNlcm5hbWUiOiJkYXNoYm9hcmQyQG1haWxzYWMuY29tIn0.aT6Oi9ijea8b_QyJZn35ve42J7464yUxY2lyawPFPI4i-TC5XUNsQf_sFA6Q8WcCCPkqEYzw_ri1Gc0IHcRyn9fzdnBsTv-Pf6bX7MWUpzBb4WZrmgpdylAJCTrRrN7jPtJ0LfcbxuhJv89uT8NrwybT2iXONOopSRSjjeD0I9KAKrdEuWFFwChlGrFGqlykYPV5GiupkgKqr-6q_4h0s7og_irxbLME9ENPJZ_BJE6kLn65UVpLcz7nPnqOXHYR6S3O9mInXD5hG2ccJQ-JJLmE8gF7eK9IA8ghlfhL_iZ-d3bHJ5m52f298rOtujQx28GRkzJR9Ag-XMURMaKOZw"
    if (!accessToken) {
      console.error("Missing access token. User must be logged in.");
      throw new Error("User must be logged in");
    }

    const response = await axios.post(
      "http://localhost:3006/database/connect",
      payload,
      {
        headers: {
          Authorization: accessToken, 
          "x-tenant-id": tenantId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Error connecting to database");
  }
};


