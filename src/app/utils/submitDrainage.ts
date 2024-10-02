const url = '/api/datamonitoring/';


interface DrainagePayload {
  water_level: number;  
  water_pressure: number;  
  timestamp: string;  
}

export const submitDrainageData = async (payload: DrainagePayload) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit data: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    
    if (error instanceof Error) {
      console.error('Error in submitting drainage data:', error.message);
      throw error;
    } else {
      console.error('Unexpected error in submitting drainage data:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};
