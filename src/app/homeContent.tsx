import testAction from "./actions";

export default async function HomeContent() {
    const response = await testAction()

    return <div>Arcadia is running!</div>;
}