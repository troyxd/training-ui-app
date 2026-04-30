import { Container } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { DataTableCard2, DateTime } from 'asab_webui_components';


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

const loader = async () => {
	try {
		const response = await fetch("https://devtest.teskalabs.com/data");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		if (!data || !data.data) {
			throw new Error("Invalid response format");
		}
	}
	catch (error) {
		console.error("Error fetching data: ", error);
		return { count: 0, rows: [] };
	}

	return { count: data.count, rows: data.data };
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
