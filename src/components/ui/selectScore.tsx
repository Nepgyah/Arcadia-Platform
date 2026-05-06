import { Field, NativeSelect } from "@chakra-ui/react"

export default function SelectScore(
    {
        currentValue,
        setFunction
    }: {
        currentValue: number,
        setFunction: (value: number) => void
    }
) {
    return (
        <Field.Root>
            <Field.Label>Score</Field.Label>
            <NativeSelect.Root>
                <NativeSelect.Field value={currentValue} onChange={(e) => setFunction(Number(e.target.value))}>
                    <option value={10}>10 - Cinema</option>
                    <option value={9}>9 - Amazing</option>
                    <option value={8}>8 - Great</option>
                    <option value={7}>7 - Actually Good</option>
                    <option value={6}>6 - Good Trash</option>
                    <option value={5}>5 - Mid</option>
                    <option value={4}>4 - Watchable Trash</option>
                    <option value={3}>3 - Very Bad</option>
                    <option value={2}>2 - Appaling</option>
                    <option value={1}>1 - Actual Trash</option>
                    <option value={-1} disabled>Select Score</option>
                </NativeSelect.Field>
            </NativeSelect.Root>
        </Field.Root>
    )
}