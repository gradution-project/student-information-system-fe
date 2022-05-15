
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentGraduationsByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/graduations?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getStudentGraduationDetailByGraduationId = async (graduationId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/${graduationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const isStudentGraduationEnabled = async (studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/enabled/by/student/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    });
    return await apiResult.json();
};

const saveStudentGraduation = async (operationUserId, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            studentId: studentId

        }),
    });
    return await apiResult.json();
};

const approveStudentGraduation = async (operationUserId, graduationId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/approve`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            graduationId: graduationId

        }),
    });
    return await apiResult.json();
};

const rejectStudentGraduation = async (operationUserId, graduationId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/reject`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            graduationId: graduationId
        }),
    });
    return await apiResult.json();
};

const confirmStudentGraduation = async (operationUserId, graduationId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/confirm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            graduationId: graduationId
        }),
    });
    return await apiResult.json();
};

const unConfirmStudentGraduation = async (operationUserId, graduationId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/unconfirm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            graduationId: graduationId
        }),
    });
    return await apiResult.json();
};


const StudentGraduationController = {
    getAllStudentGraduationsByStatus,
    getStudentGraduationDetailByGraduationId,
    isStudentGraduationEnabled,
    saveStudentGraduation,
    approveStudentGraduation,
    rejectStudentGraduation,
    confirmStudentGraduation,
    unConfirmStudentGraduation

};

export default StudentGraduationController;