<script lang="ts" context="module">
    import { BASE_URL_API } from '../../../../apiInterface';
    import { seedIdentifierFromISODateString } from '../../../../utils';

    export async function load({ params }: { params: { seedISODate: string; seedType: string } }) {
        let { seedISODate, seedType } = params;

        if (!['raw', 'enhanced'].includes(seedType)) {
            seedType = 'raw';
        }

        const identifier = seedIdentifierFromISODateString(seedISODate);

        const downloadUrl = `${BASE_URL_API}/admin/seed/${seedType}/${identifier}`;

        return {
            status: 302,
            redirect: downloadUrl,
        };
    }
</script>
