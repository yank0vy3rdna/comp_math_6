import React from "react";

interface UploadParams {
    setSettings: (arg0: string) => void
}

function SettingsFile(props: UploadParams) {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        // @ts-ignore
        fileReader.readAsText(e.target.files[0], "UTF-8");
        // @ts-ignore
        e.target.value=null
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
            // @ts-ignore
            const {result} = event.target;
            props.setSettings(result);
        };
    };
    return (
        <input type="file" accept="application/json" onChange={handleChange}/>
    );
}
export default SettingsFile;