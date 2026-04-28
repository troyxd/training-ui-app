import React from 'react';
import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { DataTableCard2, DateTime } from 'asab_webui_components';

const loader = async () => {
	let response = await fetch("https://devtest.teskalabs.com/data");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	response = await response.json();
	if (!response || !response.data) {
		throw new Error("Invalid response format");
	}

	let count = response.count;
	let rows = response.data;

	return { count, rows };
}

const getColumns = (t) => {
	return [
		{
			title: t("TableScreen|Username"),
			thStyle: {minWidth: "2rem"},
			render: ({ row }) => <div title={row.id}>{row.username}</div>
		},
		{
			title: t("TableScreen|Email"),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <div>{row.email}</div>
		},
		{
			title: t("TableScreen|Created at"),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.created}/>
		},
		{
			title: t("TableScreen|Last sign in"),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.last_sign_in}/>
		},
		{
			title: t("TableScreen|Address"),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <div>{row.address}</div>
		},
		// {
		// 	thStyle: {width: "0px"}, // This is how you do the column for buttons
		// 	tdStyle: {padding: "0px", whiteSpace: "nowrap"},
		// 	render: ({ row, column }) => (<>
		// 		<button className="btn btn-primary me-1" onClick={() => onYClick(row)}><i className="bi bi-check"></i></button>
		// 		<button className="btn btn-danger" onClick={() => onXClick(row)}><i className="bi bi-trash"></i></button>
		// 	</>)
		// }
	];
}


const Header = () => {
	const { t } = useTranslation();

	return	(<>
		<div className="flex-fill">
			<h3>
				<i className="bi bi-people pe-2"></i>
				{t("TableScreen|Users Table")}
			</h3>
		</div>
	</>);
}

export function TableScreen(props) {
	const { t } = useTranslation();

	const columns = getColumns(t);

	return (
		<Container className='h-100'>
		<DataTableCard2
			loader={loader}
			columns={columns}
			header={<Header />}
		/>
		</Container>
	);
}
