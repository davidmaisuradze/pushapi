export const isValidSaveRequest = subscription => {
    if (!subscription || !subscription.endpoint) {
        // not a valid subscription
        return {success: false, message: 'not a valid subscription'};
    }
    return {success: true};
};
