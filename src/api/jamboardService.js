import { getCreds } from "./creds";

export const save_session = async ({ channel_id, code, sessionName } = data) => {
    const creds = getCreds()
    if (!sessionName.trim()) {
        alert('Session name cannot be empty.');
        return;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL_GLOBAL}/jamboard/${channel_id}/save-jamboard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${creds.token}`,
            },
            body: JSON.stringify({
                channel_id: channel_id,
                code,
                name: sessionName,
            }),
        });

        if (response.ok) {
            return true;
        } else {
            alert('Failed to save the session.');
            console.log(response)
            return false
        }
    } catch (error) {
        console.error('Error saving session:', error.message);
        alert('An error occurred while saving the session.');
    }
};

export const load_session = async (channel_id) => {
    const creds = getCreds()
    const response = await fetch(`${import.meta.env.VITE_API_URL_GLOBAL}/jamboard/${channel_id}/load-session`, {
        headers: {
            Authorization: `Bearer ${creds.token}`
        }
    })
    const result = await response.json()
    if (response.ok) {
        return result.data
    } else {
        console.log("Error loading sessions")
        return false
    }
}