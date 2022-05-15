
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllOfficersByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/officers?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getOfficerDetailByOfficerId = async (officerId) => {
    const apiResult = await fetch(`${SIS_API_URL}/officer/${officerId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveOfficer = async (operationUserId, academicInfo, personalInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/officer`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            academicInfoRequest: {
                facultyId: academicInfo.facultyId,
                phoneNumber: academicInfo.academicPhoneNumber
            },
            personalInfoRequest: {
                address: personalInfo.address,
                birthday: personalInfo.birthday,
                email: personalInfo.email,
                name: personalInfo.name,
                phoneNumber: personalInfo.personalPhoneNumber,
                surname: personalInfo.surname,
                tcNo: personalInfo.tcNo
            }
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const updateOfficerAcademicInfo = async (operationUserId, officerId, academicInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/officer/academic/info/${officerId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            academicInfoRequest: {
                facultyId: academicInfo.facultyId,
                phoneNumber: academicInfo.phoneNumber,
            }
        }),
    });
    return await apiResult.json();
};

const updateOfficerPersonalInfo = async (operationUserId, officerId, personalInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/officer/personal/info/${officerId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            personalInfoRequest: {
                address: personalInfo.address,
                birthday: personalInfo.birthday,
                email: personalInfo.email,
                name: personalInfo.name,
                phoneNumber: personalInfo.phoneNumber,
                surname: personalInfo.surname,
                tcNo:personalInfo.tcNo
            }
        }),
    });
    return await apiResult.json();
};

const activateOfficer = async (operationUserId, officerId) => {

    const apiResult = await fetch(`${SIS_API_URL}/officer/activate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            officerId: officerId
        }),
    });
    return await apiResult.json();
};

const passivateOfficer = async (operationUserId, officerId) => {

    const apiResult = await fetch(`${SIS_API_URL}/officer/passivate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            officerId: officerId
        }),
    });
    return await apiResult.json();
};

const deleteOfficer = async (operationUserId, officerId) => {

    const apiResult = await fetch(`${SIS_API_URL}/officer`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            officerId: officerId
        }),
    });
    return await apiResult.json();
};


const OfficerController = {
    getAllOfficersByStatus,
    getOfficerDetailByOfficerId,
    saveOfficer,
    updateOfficerAcademicInfo,
    updateOfficerPersonalInfo,
    activateOfficer,
    passivateOfficer,
    deleteOfficer
};

export default OfficerController;