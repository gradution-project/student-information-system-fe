
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getOfficerDetailByOfficerId = async (officerId) => {
    const apiResult = await fetch(`${SIS_API_URL}/officer/${officerId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};


const OfficerController = {
    getOfficerDetailByOfficerId
};

export default OfficerController;