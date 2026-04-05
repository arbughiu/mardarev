import { getPayload as getPayloadInstance } from "payload";
import config from "@payload-config";

let payloadPromise: ReturnType<typeof getPayloadInstance> | null = null;

export const getPayload = () => {
  if (!payloadPromise) {
    payloadPromise = getPayloadInstance({ config });
  }
  return payloadPromise;
};
