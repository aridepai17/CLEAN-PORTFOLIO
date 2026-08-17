export default function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Advaith R Pai',
        url: 'https://advaithrpai.tech',
        jobTitle: 'Software Engineer & AI Engineer',
        worksFor: {
            '@type': 'Organization',
            name: 'Independent',
        },
        alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Muthoot Institute of Technology & Science',
        },
        sameAs: [
            'https://github.com/aridepai17',
            'https://linkedin.com/in/advaithrpai',
            'https://leetcode.com/advaithrpai17',
        ],
        knowsAbout: [
            'Artificial Intelligence',
            'Deep Learning',
            'Software Engineering',
            'Full-Stack Development',
            'React',
            'Next.js',
            'Python',
            'TensorFlow',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
