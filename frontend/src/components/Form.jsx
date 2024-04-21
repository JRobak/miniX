export default function Form(props) {
    const handleSubmit = props.handleSubmit;
    const formData = props.formData;
    const setFormData = props.setFormData;


    return (
    <>
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Imię" /><br />
            <textarea name="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} cols={40} rows={6} placeholder="Treść" /><br />
            <button type="submit" disabled={!formData.name || !formData.content}>Dodaj!</button>
        </form>
    </>
    )
} 