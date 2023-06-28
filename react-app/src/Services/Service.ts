interface IBody{
    func: string;
    args: string[];
    type: string;
}
class Service{
    async post(body: IBody){
        return await( await fetch("http://localhost:7000", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            method: "POST"
        })).json();
    }
}

export default new Service()
