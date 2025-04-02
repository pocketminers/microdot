import { readFileSync } from 'fs';
import { join } from 'path';
import { Template, ApiVersions, TemplateKinds } from './manifest';

const CURRENT_VERSION: string = ApiVersions.v0;

class ManifestLoader {
    static loadManifest(filePath: string): Template {
        const absolutePath = join(__dirname, filePath);
        const fileContent = readFileSync(absolutePath, 'utf-8');
        const manifest: Template = JSON.parse(fileContent);
        return manifest;
    }

    static parseManifest(manifest: Template): Template {
        if (manifest.apiVersion !== CURRENT_VERSION) {
            throw new Error(`ManifestLoader:parseManifest: The manifest apiVersion is not supported: ${manifest.apiVersion}`);
        }

        if (Object.keys(TemplateKinds).includes(manifest.kind) === false) {
            throw new Error(`ManifestLoader:parseManifest: The manifest kind is not supported: ${manifest.kind}`);
        }

        return manifest;
    }
}

export { ManifestLoader };