
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getOfficerDetailByOfficerId = async (officerId) => {
    const apiResult = await fetch(`${SIS_API_URL}/officer/${officerId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const updatePersonalInfo = async (operationUserId,
                                  personalInfoResponse,
                                  address, email, phoneNumber) => {

    const apiResult = await fetch(`${SIS_API_URL}/officer/update/personal-info/${personalInfoResponse.officerId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            personalInfoRequest: {
                address: address,
                birthday: personalInfoResponse.birthday,
                email: email,
                name: personalInfoResponse.name,
                phoneNumber: phoneNumber,
                surname: personalInfoResponse.surname,
                tcNo:personalInfoResponse.tcNo
            }
        }),
    });
    return await apiResult.json();
};


const OfficerController = {
    getOfficerDetailByOfficerId,
    updatePersonalInfo
};

export default OfficerController;