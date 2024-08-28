import PocketBase from 'pocketbase';

const pb = new PocketBase('https://ehh99.pockethost.io');

pb.autoCancellation = true;

export default pb;
