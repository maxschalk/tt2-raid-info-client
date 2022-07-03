<script lang="ts" context="module">
  import { BASE_URL_API } from '../../../../apiInterface';
  import { filenameFromISODateString } from '../../../../utils';

  export async function load({ params }: { params: { seedISODate: string; seedType: string } }) {
    let { seedISODate, seedType } = params;

    if (!['raw', 'enhanced'].includes(seedType)) {
      seedType = 'raw';
    }

    const { filename } = filenameFromISODateString(seedISODate);

    const downloadUrl = `${BASE_URL_API}/admin/seed_file/${seedType}/${filename}`;

    return {
      status: 302,
      redirect: downloadUrl,
    };
  }
</script>
