
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getAllFeatureToggles = async () => {
    const apiResult = await fetch(`${SIS_API_URL}/feature-toggle`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const isFeatureToggleEnabled = async (name) => {
    const apiResult = await fetch(`${SIS_API_URL}/feature-toggle/enabled/${name}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const enableFeatureToggle = async (operationUserId, name) => {
    const apiResult = await fetch(`${SIS_API_URL}/feature-toggle/enable`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            name: name
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH'
    });
    return await apiResult.json();
};

const disableFeatureToggle = async (operationUserId, name) => {
    const apiResult = await fetch(`${SIS_API_URL}/feature-toggle/disable`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            name: name
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH'
    });
    return await apiResult.json();
};


const FeatureToggleController = {
    getAllFeatureToggles,
    isFeatureToggleEnabled,
    enableFeatureToggle,
    disableFeatureToggle
};

export default FeatureToggleController;