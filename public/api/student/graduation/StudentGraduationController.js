
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentGraduationsByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/get?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getStudentGraduationDetailByGraduationId = async (graduationId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/get/${graduationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const isStudentGraduationEnabled = async (studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/enabled/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    });
    return await apiResult.json();
};

const graduateStudent = async (operationUserId, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/save`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            operationInfoRequest: {
                feUrl: "",
                userId: operationUserId
            },
            studentId: studentId

        }),
    });
    return await apiResult.json();
};

const approveStudentGraduation = async (graduationId, operationUserId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/approve`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            graduationId: graduationId,
            operationInfoRequest: {
                userId: operationUserId
            }
        }),
    });
    return await apiResult.json();
};

const confirmStudentGraduation = async (graduationId, operationUserId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/confirm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            graduationId: graduationId,
            operationInfoRequest: {
                userId: operationUserId
            }
        }),
    });
    return await apiResult.json();
};

const rejectStudentGraduation = async (graduationId, operationUserId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/reject`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            graduationId: graduationId,
            operationInfoRequest: {
                userId: operationUserId
            }
        }),
    });
    return await apiResult.json();
};

const unConfirmStudentGraduation = async (graduationId, operationUserId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/unconfirm`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            graduationId: graduationId,
            operationInfoRequest: {
                userId: operationUserId
            }
        }),
    });
    return await apiResult.json();
};


const StudentGraduationController = {
    graduateStudent,
    getAllStudentGraduationsByStatus,
    getStudentGraduationDetailByGraduationId,
    approveStudentGraduation,
    confirmStudentGraduation,
    rejectStudentGraduation,
    unConfirmStudentGraduation,
    isStudentGraduationEnabled
};

export default StudentGraduationController;