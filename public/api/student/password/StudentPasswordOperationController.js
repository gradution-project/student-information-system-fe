
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const isPasswordChangeOperationEnabled = async (operationId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/password-operation?operationId=${operationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const changePassword = async (operationId, newPassword, newPasswordRepeat) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/password-operation/change-password`, {
        body: JSON.stringify({
            operationId: operationId,
            newPassword: newPassword,
            newPasswordRepeat: newPasswordRepeat
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const forgotPassword = async (studentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/password-operation/forgot-password`, {
        body: JSON.stringify({
            studentId: studentId,
            feUrl: SIS_FE_URL
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};


const StudentPasswordOperationController = {
    isPasswordChangeOperationEnabled,
    changePassword,
    forgotPassword
};

export default StudentPasswordOperationController;