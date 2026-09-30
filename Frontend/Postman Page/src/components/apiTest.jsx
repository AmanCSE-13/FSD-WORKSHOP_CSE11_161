import { useState } from 'react';
import './apiTest.css';
function ApiTest() {
	const [method, setMethod] = useState('GET');
	const [url, setUrl] = useState('http://localhost:3000/user');
	const [requestBody, setRequestBody] = useState('');
	const [responseBody, setResponseBody] = useState('');
	const [statusCode, setStatusCode] = useState(null);
	const [loading, setLoading] = useState(false);
	async function sendRequest() {
		setLoading(true);
		setStatusCode(null);
		setResponseBody('');
		try {
			const options = { method };
			if (method !== 'GET' && requestBody.trim()) {
				options.headers = { 'Content-Type': 'application/json' };
				options.body = requestBody;
			}
			const response = await fetch(url, options);
			const text = await response.text();
			let formattedResponse = text;
			try {
				formattedResponse = JSON.stringify(JSON.parse(text), null, 2);
			} catch {
				formattedResponse = text;
			}
			setStatusCode(response.status);
			setResponseBody(formattedResponse);
		} catch (error) {
			setStatusCode('Error');
			setResponseBody(error.message);
		} finally {
			setLoading(false);
		}
	}
	return (
		<section className="api-tester">
			<div className="page-heading">
				<h1>API Tester</h1>
			</div>
			<div className="request-row">
				<select value={method} onChange={(event) => setMethod(event.target.value)}>
					<option>GET</option>
					<option>POST</option>
					<option>PUT</option>
					<option>DELETE</option>
				</select>
				<input
					type="url"
					value={url}
					onChange={(event) => setUrl(event.target.value)}
					placeholder="http://localhost:3000/user"
				/>
				<button type="button" onClick={sendRequest} disabled={loading}>
					{loading ? 'Sending...' : 'Send request'}
				</button>
			</div>

			<label htmlFor="request-body">Body</label>
			<textarea
				id="request-body"
				value={requestBody}
				onChange={(event) => setRequestBody(event.target.value)}
				placeholder={'{\n  "name": "New user",\n  "email": "new@example.com"\n}'}
				rows="6"
			/>

			<button className="status-button" type="button" disabled>
				Status: {statusCode ?? 'Not sent'}
			</button>

			<label htmlFor="response-body">Response</label>
			<pre id="response-body" className="response-box">
				{responseBody || 'The server response will appear here.'}
			</pre>
		</section>
	);
}
export default ApiTest;
