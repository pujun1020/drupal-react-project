const configfun = async () => {
    const res = await fetch('config.json');
    const data = await res.json();
    return data;
}
export default configfun;