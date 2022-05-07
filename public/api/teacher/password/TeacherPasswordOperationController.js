
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const isPasswordChangeOperationEnabled = async (operationId) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/password/operation/enabled/${operationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const changePassword = async (operationId, newPassword, newPasswordRepeat) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/password/operation/change`, {
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

const forgotPassword = async (teacherId) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/password/operation/forgot`, {
        body: JSON.stringify({
            teacherId: teacherId
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};


const TeacherPasswordOperationController = {
    isPasswordChangeOperationEnabled,
    changePassword,
    forgotPassword
};

export default TeacherPasswordOperationController;